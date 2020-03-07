* `гист:` https://gist.github.com/Aleksey-Danchin/4170890f2d50ebe6e1d6d8cf6a05a3f3

# Start of wds

### `.babelrc`

```
{
	"presets": ["@babel/preset-env"],
	"plugins": ["@babel/plugin-transform-runtime"]
}
```

### `.gitignore`

```
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
```

### `command line`


`:~$ npm install --save-dev @babel/core @babel/node @babel/cli @babel/preset-env @babel/plugin-transform-runtime @babel/runtime babel-loader webpack webpack-dev-server webpack-cli`


### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script src='/dist/app.js'></script>
</body>
</html>
```

### `package.json`

```json
"scripts": {
	"serve": "webpack-dev-server --mode development",
	"nodemon": "nodemon --exec babel-node server.js",
	"build": "webpack --mode production"
},
```

### `webpack.config.js`

```JavaScript
const path = require('path')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist'),
		publicPath: '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}]
	},
	devServer: {
		overlay: true
	}
}
```