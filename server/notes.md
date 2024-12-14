Region: Sydney (ap-southeast-2)
S3 Buckets (created in terraform config):
    - cook-book-recipes-store (for storing recipe JSON data: Just a test for now)

DynamoDB
    - Store / retrieve recipe data

## Commands
```bash
# Install pip dependencies to build dir
> make install

# Build archive file and deploy infrastructure
> make deploy

# Copy src code to build dir
> make archive

# Test lambda function by invoking in the terminal
> aws lambda invoke --region=ap-southeast-2 --function-name=$(terraform output -raw function_name) response.json

# Test HTTP request to API Gateway
> curl "$(terraform output -raw base_url)/hello" 
```
