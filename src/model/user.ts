/**
 * @description 性别枚举
 */
export enum UserSex {
  male,
  female,
}

/**
 * @description 通过微信获取的昵称和头像
 */
export interface UserInfoProp {
  avatar: string;
  nickName: string;
}

/**
 * @description 通过数据库查询的用户个人信息
 */
export interface UserProfileProp {
  id: number;
  openid?: string;
  uname?: string;
  usex?: UserSex;
  uphone?: number;
  cname?: string;
  vname?: string;
  bnum?: string;
  hnum?: string;
  house?: number;
}
