import boto3
import os
from uuid import uuid4
import json

bucketName = os.environ.get('recipe_store')
region = "ap-southeast-2"

def lambda_handler(event, context):
    # client = boto3.client("s3", region)
    # response = client.put_object(
    #    Bucket=bucketName, Key=str(uuid4()), Body=bytearray("Hello, World!", "utf-8")
    # )

    # return response
    return {
        'statusCode': 200,
        'body': json.dumps('Hello lambda!') 
    }
