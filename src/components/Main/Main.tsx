import s from "./Main.module.css";

interface IProps {
  children?: React.ReactNode;
}

export const Main: React.FC<IProps> = (props) => {
  return <main className={s.main}>{props.children}</main>;
};
