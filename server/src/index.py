import boto3
import os
from uuid import uuid4
import json

dynamodb_table_name = os.environ.get('dynamodb_table_name')
region = "ap-southeast-2"

def get_recipes(dynamo_client):
    """
    Retrieve all the recipes as JSON from the s3 bucket

    Note: 'Method' Not returning from scan...
    Need
    """

    response = dynamo_client.scan(
        TableName = dynamodb_table_name,
        IndexName = 'RecipeNameIndex',
        Select = 'ALL_ATTRIBUTES' 
    )

    return response['Items']


def add_recipe(event, dynamo_client):
    """
    Add the recipe from the POST Body to the s3 bucket
    """

    new_recipe = json.loads(event['body'])

    # TODO: Validate new_recipe payload

    # Create dynamodb item
    db_item = {
        'RecipeId': {'S': str(uuid4())},
        'RecipeName': {'S': new_recipe['RecipeName']},
        'Method': {'S': new_recipe['Method']}
    }

    return dynamo_client.put_item(
        TableName = dynamodb_table_name,
        Item=db_item
    )


def lambda_handler(event, context):
    """
    Main lambda handler
    """

    dynamo_client = boto3.client('dynamodb')
    method = event['httpMethod']
    body = None
    statusCode = 200
    try:
        match method:
            case "GET":
                recipes = get_recipes(dynamo_client)
                body = json.dumps(recipes)
                statusCode = 200
            case "POST":
                response = add_recipe(event, dynamo_client)
                body = json.dumps(response)
                statusCode = 200
            case _:
                statusCode = 404
    except Exception as e:
        # Return error status 
        statusCode = '500'
        body = json.dumps({'error': str(e)})
    
    response = {'statusCode': statusCode }
    if body:
        response['body'] = body
    
    return response

if __name__ == '__main__':
    # Testing
    # event = {'httpMethod': 'POST', 'body': {'RecipeName': 'Potato Bake', 'Method': 'Make the potato!'}}
    event = {'httpMethod': 'GET'}
    response = lambda_handler(event, None)
    print(response)
