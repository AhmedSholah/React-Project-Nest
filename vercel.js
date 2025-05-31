const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();

let app;

module.exports = async (req, res) => {
    if (!app) {
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(server),
        );
        await nestApp.init();
        app = server;
    }
    return app(req, res);
};
