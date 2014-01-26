
test: bin/big node_modules
	@touch a.js b.js
	@chmod +x a.js
	@chmod +x b.js
	time $< $< > a.js
	time ./a.js $< > b.js
	@diff a.js b.js || echo "a.js and b.js should be the same"


node_modules: package.json
	@packin install -m $< -f $@

.PHONY: test
