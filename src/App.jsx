import React from 'react'
import {
    Button,
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableCell
} from '@material-ui/core'
import './App.css'

class Flag extends React.Component {
            
    constructor(props) {
        super(props)
        this.state = {image:null,cap:null,reg:null,id:null,opacity:1}
        this.URI = 'https://restcountries.eu/rest/v2/name/'
    }

    componentDidMount(){
        this.timer = setInterval(() => {
            let {opacity} = this.state;
            opacity -= 0.025
            if (opacity <= 0) opacity = 1
            this.setState({opacity:opacity})
        },100);
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }


    showData (event){
        this.setState({id:event.target.value})
    }

    search=()=>{
        this.loadData(this.URI, this.state.id)
    }

    clearInput=()=>{
        this.setState({image:null,cap:null,reg:null})
        this.myInput.focus()
    }

    async loadData (uri,id) {
        const URI = uri + id 
        const data = await window.fetch(URI)
            .then(res => res.json())
            .then(json => json[0])
            .then(prefs => ({
                cap:prefs.capital,
                reg:prefs.region,
                image:prefs.flag
            }))
        .catch(error => console.log(error))
        this.setState(data)
    }


    render(){
        const {image,cap,reg} = this.state
        return(
            <div>
                <h1 style={{opacity:this.state.opacity}}>各国の情報を検索してみよう</h1>
                
                <input onChange={event=>this.showData(event)} placeholder="英語で国名を入力して下さい" ref = {myInput=>this.myInput=myInput} type="text"/>&nbsp;
                <Button variant='contained' color='inherit' onClick={this.search}>検索</Button>&nbsp;
                <Button variant='contained' color='inherit' onClick={this.clearInput}>リセット</Button>
                <TestView getImage={image} getCapital={cap} getRegion={reg}/>            
            </div>
                    
        )
    }
}
        
class TestView extends React.Component{
    render(){
        const {getImage,getCapital,getRegion} = this.props
        var image 
        if(true){
            image = (<img src={getImage} alt=""/>);
        }
        return(
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>首都</TableHead>
                        <TableCell>{getCapital}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>地域</TableHead>
                        <TableCell>{getRegion}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>国旗</TableHead>
                        <TableCell>{image}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
}      
export default Flag
