output "lambda_bucket_name" {
  description = "Name of the S3 bucket used to store function code."

  value = aws_s3_bucket.lambda_bucket.id
}

output "dynamodb_table_name" {
    description = "Name of the dynamodb for recipes"

    value = aws_dynamodb_table.dynamodb_recipe_table.name
}

output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.create_recipe.function_name
}

output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.lambda.invoke_url
}

