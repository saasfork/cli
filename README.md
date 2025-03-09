# SaasFork CLI

SaasFork CLI is a command line tool to facilitate the development and management of your SaaS projects.

## Usage

### With npx (recommended)

```bash
npx @saasfork/cli [command] [options]
```

### Installation (optional)

If you prefer to install the CLI globally:

```bash
# Global installation
npm install -g @saasfork/cli

# Or with yarn
yarn global add @saasfork/cli

# Then use
saasfork [command] [options]
```

## Available Commands

### Help Command

```bash
npx @saasfork/cli --help
```

### Creating a New Project

```bash
npx @saasfork/cli <project-name>
```

#### Options

| Option | Description |
|--------|-------------|
| `<project-name>` | Name of the project to create (required) |

### Other Commands

More commands will be added as the tool develops.

## Publishing Command

To publish a new version of the CLI:

```bash
# Increment for a patch
npm version patch

# login
npm login

# Publish
npm publish --access public
```

## Development

To contribute to the CLI development:

```bash
# Clone the repository
git clone [repo-url]

# Install dependencies
npm install

# Link the package for development
npm link
```

## License

ISC
