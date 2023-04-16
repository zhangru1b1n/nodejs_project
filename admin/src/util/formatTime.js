import moment from 'moment'
moment.locale("zn-cn")
const formatTime = {
    getTime:(date)=>{
        return moment(date).format('YYYY/MM/DD')
    }
}

export default formatTime