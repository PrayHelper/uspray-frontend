build-dev:
	docker compose -p frontend-dev -f ./deploy/docker-compose.dev.yml down
	docker compose -p frontend-dev -f ./deploy/docker-compose.dev.yml up --build -d

build-prod:
	docker compose -p frontend-prod -f ./deploy/docker-compose.prod.yml down
	docker compose -p frontend-prod -f ./deploy/docker-compose.prod.yml up --build -d

build-intg:
	docker compose -p frontend-intg -f ./deploy/docker-compose.intg.yml down
	docker compose -p frontend-intg -f ./deploy/docker-compose.intg.yml up --build -d

build-hotfix:
	docker compose -p frontend-hotfix -f ./deploy/docker-compose.hotfix.yml down
	docker compose -p frontend-hotfix -f ./deploy/docker-compose.hotfix.yml up --build -d