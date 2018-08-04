
all: clean documents verify

# Generate docuemnts inside a container, all *.adoc in parallel
documents:
	@docker-compose up --build --force-recreate -d build-html

verify: verify-links verify-w3c

verify-links:
	@docker run --rm \
		-v $(CURDIR)/dist:/dist \
		18fgsa/html-proofer \
			--check-html \
			--http-status-ignore "999" \
			--url-ignore "/localhost:/,/127.0.0.1:/" \
        /dist/index.html

verify-w3c:
	@docker run --rm -v $(CURDIR)/dist:/app stratdat/html5validator

serve:
	@docker-compose up --build --force-recreate -d serve

shell:
	@docker-compose up --build --force-recreate -d shell
	@docker-compose exec shell sh

clean:
	@docker-compose down -v --remove-orphans
	rm -rf $(CURDIR)/dist/*

.PHONY: all documents verify verify-links verify-w3c serve
