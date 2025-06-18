const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const dynamo = new AWS.DynamoDB.DocumentClient();
const usersTable = process.env.USERS_TABLE;
const agendazapTable = process.env.AGENDAZAP_TABLE;

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Hello from Agendazap Backend!");
});

// Rota para registrar usuário
app.post("/register", async (req, res) => {
  const { nome, email, senha, telefone_whatsapp } = req.body;

  if (!nome || !email || !senha || !telefone_whatsapp) {
    return res.status(400).json({ message: "Dados incompletos." });
  }

  // Checa se o email já está cadastrado
  try {
    const existing = await dynamo
      .scan({
        TableName: usersTable,
        FilterExpression: "email = :email",
        ExpressionAttributeValues: { ":email": email },
        ProjectionExpression: "userId",
      })
      .promise();

    if (existing.Items && existing.Items.length > 0) {
      return res.status(409).json({ message: "Email já está em uso." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao verificar usuário." });
  }

  const userId = uuidv4();
  const timestamp = new Date().toISOString();

  const params = {
    TableName: usersTable,
    Item: {
      userId,
      PK: `USER#${userId}`,
      SK: `METADATA#${userId}`,
      nome,
      email,
      senha, // **Importante:** Em produção, hash a senha!
      telefone_whatsapp,
      created_at: timestamp,
      updated_at: timestamp,
    },
  };

  try {
    await dynamo.put(params).promise();
    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso.", userId });
  } catch (error) {
    console.error(error);
    if (error.code === "ConditionalCheckFailedException") {
      res.status(409).json({ message: "Email já está em uso." });
    } else {
      res.status(500).json({ message: "Erro ao registrar usuário." });
    }
  }
});

module.exports.app = serverless(app);
