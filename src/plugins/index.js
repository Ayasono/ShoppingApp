// 该文件记录单独引入的vant组件
import Vue from "vue";
// 原始代码
import {
    AddressEdit,
    AddressList,
    Area,
    Button,
    Cell,
    Checkbox,
    CheckboxGroup,
    Divider,
    Empty,
    Field,
    GoodsAction,
    GoodsActionButton,
    GoodsActionIcon,
    Grid,
    GridItem,
    Icon,
    List,
    NavBar,
    Overlay,
    Popup,
    Search,
    Sidebar,
    SidebarItem,
    Sku,
    Stepper,
    Sticky,
    SubmitBar,
    Swipe,
    SwipeCell,
    SwipeItem,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs
} from 'vant';
// 编译后代码
import 'vant/es/button/style';

Vue.use(Cell)

Vue.use(SubmitBar);
Vue.use(SwipeCell);
Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Overlay);

Vue.use(Divider);

Vue.use(AddressList);

Vue.use(Field);
Vue.use(Sku);

Vue.use(Area);
Vue.use(AddressEdit);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use(Empty);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sidebar)
Vue.use(SidebarItem)

Vue.use(List)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Sticky)
Vue.use(Search)
Vue.use(NavBar)
