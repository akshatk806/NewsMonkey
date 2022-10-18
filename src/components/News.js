import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types' // snippet -> impt
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:15,
        category:"general"
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    capitalizeFirstLetter=string=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        // console.log("Hello I am a constructor from news component");

        // Setting the state
        this.state = {
            articles: [],
            page:1,
            loading:true,
            totalResults:0
        }
        if(this.props.category==='general'){
            document.title='NewsMonkey';
        }else{
            document.title=`NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
        }
    }

    async componentDidMount(){
        // console.log("componentDidMount method started")
        this.props.setProgress(10)

        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f8d2a3de3b4601b4c5659d1d659000&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let response=await fetch(url);
        // console.log(response);
        this.props.setProgress(30)
        let data=await response.json();
        // console.log(data);
        this.props.setProgress(70)

        this.setState({
            articles:data.articles,
            totalResults:data.totalResults,
            loading:false
        })
        this.props.setProgress(100)
    }

    /*
    handlePrevClick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1165d9147f145c19dcd22265569e78b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let response=await fetch(url);
        let data=await response.json();
        this.setState({
            page:this.state.page-1,
            articles:data.articles,
            loading:false
        })
    }

    handleNextClick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1165d9147f145c19dcd22265569e78b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let response=await fetch(url);
        let data=await response.json();
        this.setState({
            page:this.state.page+1,
            articles:data.articles,
            loading:false
        })
    }
    */

    fetchMoreData=async ()=>{
        this.setState({
            page:++this.state.page
        })
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f8d2a3de3b4601b4c5659d1d659000&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response=await fetch(url)
        let data=await response.json();
        this.setState({
            articles:this.state.articles.concat(data.articles),
            totalResults:data.totalResults
        })
    }

    render() {
        // console.log("Render method started");
        return (
            <>
                <h1 className='text-center'>{this.props.category==='general'?'NewsMonkey - Top Headlines':`NewsMonkey - Top ${this.capitalizeFirstLetter(this.props.category)} News`}</h1>
                
                {this.state.loading && <Spinner />}   {/* If the first condtion is true then only the second statement will checked*/}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element,index) => {
                                return <div key={index} className="col-md-4">
                                    <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                    
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News