import boto3
import os
from uuid import uuid4
import json

bucketName = os.environ.get('recipe_store')
region = "ap-southeast-2"

"""
Retrieve all the recipes as JSON from the s3 bucket
"""
def get_recipes(s3_client):
    obj = s3_client.get_object(Bucket=bucketName, Key="recipes")
    return obj['Body'].read().decode('utf-8')

"""
Add the recipe from the POST Body to the s3 bucket
"""
def add_recipe(event, s3_client):
    recipes = get_recipes(s3_client)
    recipes = json.loads(recipes)
    new_recipe = json.loads(event['body'])
    recipes['recipes'].append(new_recipe)
    
    # Write the new recipes list to the S3 Bucket
    try:
        s3_client.put_object(Bucket=bucketName, Key="recipes", Body=json.dumps(recipes))
        return True
    except:
        return False

"""
Main lambda handler
"""
def lambda_handler(event, context):
    s3_client = boto3.client("s3", region)
    method = event['httpMethod']
    body = None
    statusCode = 200
    match method:
        case "GET":
            recipes = get_recipes(s3_client)
            statusCode = 200
            body = json.dumps(recipes)
        case "POST":
            success = add_recipe(event, s3_client)
            statusCode = 200 if success else 500
        case _:
            statusCode = 404
    
    response = {
        'statusCode': statusCode
    }

    if body:
        response['body'] = body

    return response

if __name__ == '__main__':
    # event = {'httpMethod': 'POST', 'body': json.dumps({'pickles': ['yeahhh']})}
    event = {}
    lambda_handler(event, None)
