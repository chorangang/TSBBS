init:
	docker compose build
	docker compose up
up:
	docker compose up
down:
	docker compose down
migrate:
	docker compose exec app npx prisma migrate dev --name init
	docker compose exec app npx prisma generate
generate:
	docker compose exec app npx prisma generate
test:
	docker compose exec app npm run test
test-watch:
	docker compose exec app npm run test:watch
lint:
	docker compose exec app npm run lint
lint-fix:
	docker compose exec app npm run lint:fix
seed:
	docker compose exec app npx prisma db seed --preview-feature
catastrophe:
	docker compose down --volumes --remove-orphans