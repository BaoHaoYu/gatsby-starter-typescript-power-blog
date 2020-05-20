import * as React from 'react';
import { Link } from 'gatsby';

export interface ISideBarProps {
  tags?: string[];
  categories?: string[];
  date: string;
  author?: string;
  authorUrl?: string;
  lastModified?: Date;
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  return (
    <ul className="list-inline post-meta mb-4">
      {props.author && (
        <li className="list-inline-item">
          <i className="ti-user mr-2" />
          <a href={props.authorUrl}>{props.author}</a>
        </li>
      )}

      <li className="list-inline-item">Date : {props.date}</li>

      {props.categories && (
        <li className="list-inline-item">
          分类 :
          {props.categories?.map((category) => (
            <Link key={category} to={'/categories/' + category}>
              {category}
            </Link>
          ))}
        </li>
      )}

      {props.tags && (
        <li className="list-inline-item">
          标签 :
          {props.tags?.map((tag) => (
            <Link key={tag} to={'/tags/' + tag}>
              {tag}
            </Link>
          ))}
        </li>
      )}
    </ul>
  );
};

export default SideBar;
