_svr_name = aicover
_build_time = $(shell date +%y%m%d%H%M%S) 
_image_name = ${_svr_name}:v${_build_time}

dev:
	pnpm dev --hostname 0.0.0.0 --port 8013

docker-build:
	docker build -f deploy/Dockerfile -t ${_svr_name} .