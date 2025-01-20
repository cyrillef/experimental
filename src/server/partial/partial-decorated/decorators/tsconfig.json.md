{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "../../..",
        "strict": true,
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"isolatedModules": true,
		"skipLibCheck": true,
		"resolveJsonModule": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"sourceMap": true
    },
    "include": [
        "**/*.ts"
    ],
    "exclude": [
        "**/node_modules/*",
        "bin",
        "dist",
        "public",
		"**/*.d.ts"
    ]
}