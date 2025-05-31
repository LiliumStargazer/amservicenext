build:
	docker buildx build -t lalghisi/amservice --platform linux/amd64 --push . -f Dockerfile