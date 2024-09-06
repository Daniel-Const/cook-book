install:
	python -m pip install --target ./build/ -r requirements.txt

archive:
	cp src/index.py build/

deploy:
	terraform apply
