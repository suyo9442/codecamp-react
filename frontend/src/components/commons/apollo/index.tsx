import { ApolloClient,ApolloLink, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

interface IApolloSettingProps {
    children: JSX.Element
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
	const uploadLink = createUploadLink({
		uri: "http://backend-practice.codebootcamp.co.kr/graphql"
	})
	// const errorLink
	// const authLink
	
  const client = new ApolloClient({
      // uri: "http://backend09.codebootcamp.co.kr/graphql",
      uri: "http://backend-practice.codebootcamp.co.kr/graphql",
      cache: new InMemoryCache(),
      link: ApolloLink.from([uploadLink])
  })

  return (
      <ApolloProvider client={client}>
          {props.children}
      </ApolloProvider>
  )
}
