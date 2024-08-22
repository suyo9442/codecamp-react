// console.log('node로 타입스크립트 실행')

import {DataSource} from "typeorm";
import {Board} from "./Board.postgres";
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

// const DB_HOST = 'codecamp-react.c1ig8ksmqgbt.ap-southeast-2.rds.amazonaws.com';
// const DB_PORT = 5432
// const DB_USERNAME = 'postgres'
// const DB_PASSWORD = '20230708Xbox!'
// 1. api 생성
const typeDefs = `#graphql
	input CreateBoardInput {
		writer: String
		title: String
		contents: String
	}
	
	type MyBoard {
		number: Int
		writer: String
		title: String
		contents: String
	}
	
	type Query {
		fetchBoards: [MyBoard]
	}
	
	type Mutation {
		createBoard(createBoardInput: CreateBoardInput): String
	}
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: async () => {
			// 1. 모두 꺼내기
			return await Board.find();
			// return await Board.find({where: {isDeleted: false}}); // 삭제하지 않은 것만 갖고오기
			
			// 2. 한개만 꺼내기
			// const result = await Board.findOne({where: {number: 3}})
    }
  },
  Mutation: {
		createBoard: async (parent: any, args: any, context: any, info: any) => {
			await Board.insert({
				...args.createBoardInput
				
				// writer: "철수",
				// title: "안녕하세요.",
				// contents: "잘 부탁드립니다."
			});
			
			return "게시글 등록 완료";
		},
		
		updateBoard: async () => {
			await Board.update({number: 3}, {writer: "영희"});
		},

		deleteBoard: async () => {
			// 1. 리얼 삭제
		  // await Board.delete({number: 3});

		  // 2. 실무에선 숨김처리
		  // await Board.update({number: 3}, {isDeleted: true});
		  // await Board.update({number: 3}, {deletedAt: new Date()}); // 날짜로 처리
		}
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


// 2. 데이터베이스 연동
const AppDataSource =  new DataSource({
	type: "postgres",
	host: 'codecamp-react.c1ig8ksmqgbt.ap-southeast-2.rds.amazonaws.com',  // DB가 깔린 컴퓨터 IP주소
	port: 5432,             // DB가 깔린 컴퓨터 포트
	username: 'postgres',
	password: '20230708Xbox!',
	database: 'postgres',
	entities: [Board],
	synchronize: true,      // 작성 테이블과 실제 데이터베이스와의 동기화
	logging: true,           // 명령어 변환과정 확인
  ssl: {
    rejectUnauthorized: false
  }
})

AppDataSource.initialize().then(() => {
	console.log('DB 접속 성공')
	startStandaloneServer(server).then(() => console.log('GraphQL 서버 실행'))
}).catch(err => {
	console.log('DB 접속 실패')
	console.log(err)
})
