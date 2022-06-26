import React,{useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  const [articles, SetArticles] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [page, SetPage] = useState(1);
  const [totalResults, SetTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const fetchMoreData = async () => {
    
    props.setProgress(10);
    // console.log(props.apiKey)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0bad4334fa314d93bda5c876066f43e7&page=${page+1}&pageSize=${props.pageSize}`;
    
    SetPage(page+1);
    SetLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    console.log(parsedData.articles)
    props.setProgress(70);
    if(parsedData.articles !== undefined){
      SetArticles(articles.concat(parsedData.articles));
    }
    SetTotalResults(parsedData.totalResults);
    SetLoading(false)
    props.setProgress(100);
    
  };
  
  useEffect(()=>{
    document.title = `NewsMonk - ${capitalizeFirstLetter(props.category)}`
    fetchMoreData();
    // eslint-disable-next-line
  },[])

  // const handleNextClick = async ()=>{
  //   SetPage(page+1);
  //   fetchMoreData();
  // }

  // const handlePrevClick = async ()=>{
  //   SetPage(page-1);
  //   fetchMoreData();
  // }

    return (
      <>
        <h1 className="text-center" style={{ margin: '90px 0px' }}>NewsMonk - Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""} imageUrl={element.urlToImage} description={element.description ? element.description.slice(0, 80) : ""} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container my-5 d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick()}>	&larr; Previous</button>
          <button disabled={state.page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick()}>Next &rarr;</button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
