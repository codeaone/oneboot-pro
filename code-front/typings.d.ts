declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

interface Window {
  appid: string;
  key: string;
  token: string;
  gateway: string;
  isDev:boolean;
  user:any;
  viewAuth:string;
  authlist:string[];
  cloumnsAuth:any;
}
