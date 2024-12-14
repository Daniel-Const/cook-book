provider "aws" {
  region = "ap-southeast-2"
}

# Generate random suffix id
resource "random_pet" "lambda_bucket_name" {
  prefix = "cook-book-serverless"
  length = 4
}

# ---------------------
# Create s3 bucket to store lambda functions
# ---------------------
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
}

resource "aws_s3_bucket_ownership_controls" "lambda_bucket" {
  bucket = aws_s3_bucket.lambda_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "lambda_bucket" {
  depends_on = [aws_s3_bucket_ownership_controls.lambda_bucket]

  bucket = aws_s3_bucket.lambda_bucket.id
  acl    = "private"
}

resource "aws_s3_object" "lambda_object" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = data.archive_file.lambda_object.id
  source = data.archive_file.lambda_object.output_path

  etag = filemd5("${path.module}/cookbook-src.zip")
}


# ---------------------
# DynamoDB table for storing recipe data 
# ---------------------
resource "aws_dynamodb_table" "dynamodb_recipe_table" {
  name           = "CookbookRecipes"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "RecipeId"
  range_key      = "RecipeName"

  attribute {
    name = "RecipeId"
    type = "S"
  }

  attribute {
    name = "RecipeName"
    type = "S"
  }

  global_secondary_index {
    name               = "RecipeNameIndex"
    hash_key           = "RecipeName"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "ALL"
  }

  tags = {
    Name        = "dynamodb-table-cookbook"
    Environment = "production"
  }
}

# ---------------------
# Package into zip and copy function to S3
# ---------------------
data "archive_file" "lambda_object" {
  type = "zip"

  source_dir  = "${path.module}/build"
  output_path = "${path.module}/cookbook-src.zip"
}



# ---------------------
# Create lambda function
# ---------------------
resource "aws_lambda_function" "create_recipe" {
  function_name = "CreateRecipe"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_object.key

  runtime = "python3.12"
  handler = "index.lambda_handler"

  source_code_hash = data.archive_file.lambda_object.output_base64sha256

  role = aws_iam_role.lambda_exec.arn

  timeout = 10

  environment {
    variables = {
        dynamodb_table_name = aws_dynamodb_table.dynamodb_recipe_table.name
    }
  }
}

resource "aws_cloudwatch_log_group" "create_recipe" {
  name = "/aws/lambda/${aws_lambda_function.create_recipe.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_exe" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_policy_s3" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}


# ---------------------
# Setup API Gateway
# ---------------------
resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "create_recipe" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.create_recipe.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "create_recipe" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "ANY /recipes"
  target    = "integrations/${aws_apigatewayv2_integration.create_recipe.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_recipe.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}


