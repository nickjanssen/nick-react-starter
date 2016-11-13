import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount() {
    const clock = new THREE.Clock()

    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )

    this._container.appendChild(renderer.domElement)
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 )

    const controls = new THREE.OrbitControls( camera )
    controls.damping = 0.2

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize( window.innerWidth, window.innerHeight )
    }, false)

    const init = () => {
      this.cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() )
      scene.add(this.cube)

    	camera.position.y = 150
    	camera.position.z = 350
      camera.lookAt(new THREE.Vector3())
    }

    const tick = (dt) => {
      this.cube.rotation.x += 0.2 * dt
      this.cube.rotation.y += 0.225 * dt
      this.cube.rotation.z += 0.175 * dt
    }

    const animate = () => {
      const delta = clock.getDelta()
      requestAnimationFrame(animate)

      tick(delta)
      renderer.render(scene, camera)
    }

    init()
    animate()
  }
  render() {
    return (
      <div ref={(c) => this._container = c} className="render-view"></div>
    )
  }
}
