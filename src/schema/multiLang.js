import { gql } from 'apollo-server-express';

export default gql`
  type MultiLang {
    en_us: String
    zh_hk: String
    ja_jp: String
  }

  input multiLang {
    en_us: String
    zh_hk: String
    ja_jp: String
  }
`;
