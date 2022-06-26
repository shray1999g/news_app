import React from "react";

const NewsItem = (props)=> {
  
    let {title,description,imageUrl, newsUrl, author, date} = props;
    return (
      <div className="my-3" >
        <div className="card" >
            <img style={{height: '200px'}} src={imageUrl} alt="" />
          <div className="card-body" >
            <h5 className="card-title">{title}...</h5>
            <p className="card-text" style={{height: '4rem'}}>
             {description}...
            </p>
            <p className="card-text" ><small className="text-muted">Published By: {author? author:'Unknown'}</small></p>
            <p className="card-text" ><small className="text-muted">Posted On: {new Date(date).toGMTString()}</small></p>

            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
