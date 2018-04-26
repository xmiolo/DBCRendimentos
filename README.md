# Informações do projeto


# Execução

  Junto deste email foi enviado uma versão já compilada(.jar) do projeto. Para subir o mesmo, deve-se configurar o JAVA_HOME na máquina com o diretório do seu Java, preferencialmente na versão 8, e executar o comando: 
java -jar .\dbcrendimentos-0.0.1-SNAPSHOT.jar

# Banco de dados

Estou utilizando uma versão web free de MySql para facilitar o desenvolvimento, que pode ser acessado através do seguinte link.

  http://www.phpmyadmin.co
  - Server: sql10.freemysqlhosting.net
  - Username: sql10234699
  - Password: 7BpZPGnTiM

Para rodar em uma versão local do banco de dados, deve ser alterado o seguinte arquivo e adicionar suas informações da instância local.
DBCRendimentos/src/main/resources/application.properties

Lembrando que, caso seja apontado para um instância local, na primeira execução, deve-se mudar o parâmetro “spring.jpa.hibernate.ddl-auto=update” para “create”
