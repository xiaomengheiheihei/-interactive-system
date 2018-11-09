import Loadable from 'react-loadable'
import { DelayLoading } from '../utils/util'

const Index = Loadable({
    loader: () => import('../views/index/indexContent'),
    loading: DelayLoading,
    delay: 300
})

const LeaveMessage = Loadable({
    loader: () => import('../views/leaveMessage/index'), 
    loading : DelayLoading,
    delay:300
})

export default [
    {
        'path': '/index',
        'component': Index
    },
    {
        'path': '/messageManage',
        'component': LeaveMessage
    }
]