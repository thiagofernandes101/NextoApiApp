const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0.0',
        title: 'NextoApi',
        description: 'LPIV-6',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Perfil",
            "description": "Endpoints"
        },
        {
            "name": "Usuario",
            "description": "Endpoints"
        },
        {
            "name": "Solicitacao",
            "description": "Endpoints"
        }
    ],
    paths: {
        "/api/usuario/registrar": {
            "post": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/usuario/": {
            "get": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "put": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/usuario/{id}": {
            "get": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/usuario/autenticar": {
            "post": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "obj",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Usuario": {
                                    "example": "any"
                                },
                                "Senha": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/usuario/alteraSenha": {
            "post": {
                "tags": [
                    "Usuario"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "obj",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Usuario": {
                                    "example": "any"
                                },
                                "Senha": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/perfil/": {
            "post": {
                "tags": [
                    "Perfil"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "get": {
                "tags": [
                    "Perfil"
                ],
                "description": "",
                "parameters": [],
                "responses": {}
            },
            "put": {
                "tags": [
                    "Perfil"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/perfil/{id}": {
            "get": {
                "tags": [
                    "Perfil"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {}
            },
            "delete": {
                "tags": [
                    "Perfil"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/formulario/": {
            "post": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "get": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "put": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/formulario/{id}": {
            "get": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/solicitacao/": {
            "post": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "get": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "put": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/solicitacao/{id}": {
            "get": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "obj",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Id": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Solicitacao"
                ],
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        }
    },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./endpoints.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server')
});