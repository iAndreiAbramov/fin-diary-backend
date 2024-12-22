flush_restart: docker_flush docker_run
restart: docker_restart
up: docker_run
stop: docker_stop
down: docker_down

# Docker commands
docker_restart: docker_down docker_run
docker_flush: docker_down flush_directories

docker_run:
	docker compose --file docker-compose.dev.yml --project-name "fin-diary" up -d

docker_stop:
	docker compose --file docker-compose.dev.yml --project-name "fin-diary" stop

docker_down:
	docker compose --file docker-compose.dev.yml --project-name "fin-diary" down

# Docker data directories
clean: flush_directories
flush_directories: remove_postgres remove_dist

remove_postgres:
	rm -rf .docker/postgres

remove_dist:
	rm -rf ./dist
