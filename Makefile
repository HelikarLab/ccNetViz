pack:
	webpack

minified: pack
	nodejs compile.js

tests:
	nodejs

curversion: minified
	nodejs create_version.js