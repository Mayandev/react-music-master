import React from 'react'
import { get } from '@/utils/ajax'
import { SearchBar } from 'antd-mobile'
import style from './style/index.module.less'

class SearchPage extends React.Component {
    state = {
        hotlist: [],   //热门搜索列表
        isFocus: false, //输入框是否聚焦
        keywords:'', //搜索关键词
        suggestList:[]  //搜索建议列表
    }

    componentDidMount () {
        this.getHotlist()
    }

    getHotlist = async () => {
        const res = await get('/search/hot')
        this.setState({
            hotlist: res.result ? res.result.hots : []
        })
    }
    getSuggestList = async (keywords)=>{
        if(!keywords){
            this.setState({
                suggestList:[]
            })
            return
        }
        const res = await get(`/search/suggest`,{
            keywords,
            type:'mobile'
        })
        this.setState({
            suggestList: res.result ? res.result.allMatch : []
        })
    }
    handleChange = async (keywords)=>{
        this.getSuggestList(keywords)
        this.setState({
            keywords
        })
    }
    search = async (keywords)=>{
        const res = await get(`/search/suggest?keywords=${keywords}`)
        console.log(444,res)
    }

    render () {
        const {hotlist, isFocus,keywords,suggestList} = this.state

        console.log(33,suggestList)

        const FocusBox = () => <div>
            聚焦
        </div>

        const BlurBox = () => <div>
            <div className={style['hot-list-box']}>
                <div>热门搜索</div>
                <ul>
                    {hotlist.map(hot=><li key={hot.first}>{hot.first}</li>)}
                </ul>
            </div>
        </div>

        return (
            <div>
                <div>
                    <SearchBar
                        value={keywords}
                        onSubmit={this.search}
                        onChange={this.handleChange}
                        placeholder={'搜索歌手、歌曲、专辑'}
                        onBlur={() => this.setState({isFocus: false})}
                        onFocus={() => this.setState({isFocus: true})}/>
                </div>
                <div>
                    {isFocus || keywords ? <FocusBox/> : <BlurBox/>}
                </div>
            </div>
        )
    }
}

export default SearchPage