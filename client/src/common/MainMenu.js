import React, { Component } from 'react';
import LeftMenu from './leftMenu'
import RightMenu from './rightMenu'
import {Link} from 'react-router-dom'
import { Drawer, Button } from 'antd';
class Navbar extends Component {
  state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
onClose = () => {
    this.setState({
      visible: false,
    });
  };
render() {
    return (
        <div style={{background:'#333'}}>
          <nav className="menuBar">
            <div className="logo">
              <Link to='/'>Logo</Link>
            </div>
            <div className="menuCon">
              <div className="leftMenu">
                <LeftMenu />
              </div>
              <div className="rightMenu">
                  <RightMenu />
              </div>
              <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                <span className="barsBtn"></span>
              </Button>
              <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <LeftMenu />
                <RightMenu />
              </Drawer>
            </div>
          </nav>
        </div>
    );
  }
}
export default Navbar;