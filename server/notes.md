Region: Sydney (ap-southeast-2)
S3 Buckets (created in terraform config):
    - cook-book-serverless (for storing lambda function code)
    - cook-book-recipes-store (for storing recipe JSON data: Just a test for now)

## Commands
```bash
# Install pip dependencies to build dir
> make install

# Copy src code to build dir
> make archive

# Test lambda function by invoking in the terminal
> aws lambda invoke --region=ap-southeast-2 --function-name=$(terraform output -raw function_name) response.json

# Test HTTP request to API Gateway
> curl "$(terraform output -raw base_url)/hello" 
```
