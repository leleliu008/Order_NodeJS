# Order_NodeJS
企业员工晚上加班点餐系统，基于node.js + express + ejs + Bootstrap + MySql
</br></br>
该`Web App`的开发详情请查看：http://blog.fpliu.com/it/software/development/language/NodeJS/develop-web-app
</br></br>

## 在本地部署
```
git clone https://github.com/leleliu008/Order_NodeJS.git
cd Order_NodeJS
npm install --registry=https://registry.npm.taobao.org
cd src/public
npx bower install
cd -
npm start
```
## 在Docker中部署
1、下载代码、安装依赖模块、构建：
```
git clone https://github.com/leleliu008/Order_NodeJS.git
cd Order_NodeJS
npm install --registry=https://registry.npm.taobao.org
cd src/public
npx bower install
cd -
npx gulp
```
2、构建镜像：
```
docker-compose build
```
3、运行容器：
```
docker-compose up -d
```
4、访问服务：
```
http://localhost:3000
```
