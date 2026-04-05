"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DentalBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Textures with pure transparency conversion
    const processTexture = (url: string) => {
      const img = new Image()
      img.src = url
      const texture = new THREE.Texture(img)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imgData.data
          // Remove black background (anything very dark)
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            
            // Calculate brightness/luminance
            const brightness = (r + g + b) / 3
            
            // If the pixel is dark, make it transparent
            // Using a higher threshold (45) to catch compression artifacts
            if (brightness < 45) {
              data[i + 3] = 0
            } else if (brightness < 60) {
              // Smooth transition for edges
              data[i + 3] = (brightness - 45) / 15 * 255
            }
          }
          ctx.putImageData(imgData, 0, 0)
          texture.image = canvas as any
          texture.needsUpdate = true
        }
      }
      return texture
    }

    const toothTextures = [
      processTexture('/textures/tooth-1.png'),
      processTexture('/textures/tooth-2.png'),
      processTexture('/textures/tooth-3.png')
    ]

    // Floating Teeth Group
    const teeth: THREE.Sprite[] = []
    const toothCount = 14

    for (let i = 0; i < toothCount; i++) {
      const material = new THREE.SpriteMaterial({ 
        map: toothTextures[i % toothTextures.length],
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2, // Subtle
        depthWrite: false // Performance and layering fix
      })
      const sprite = new THREE.Sprite(material)
      
      // Random initial position
      sprite.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30, 
        (Math.random() - 0.5) * 20 - 10
      )
      
      // Random scale for depth
      const scale = 2 + Math.random() * 4
      sprite.scale.set(scale, scale, 1)
      
      // Custom properties for animation
      ;(sprite as any).step = Math.random() * Math.PI * 2
      ;(sprite as any).speed = 0.0003 + Math.random() * 0.0008
      ;(sprite as any).rotationSpeed = (Math.random() - 0.5) * 0.002

      scene.add(sprite)
      teeth.push(sprite)
    }

    // Glowing Particles (Dust)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: '#66fcf1',
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 10

    // Mouse Tracking
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5
      mouseY = (event.clientY / window.innerHeight) - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Animate Teeth
      teeth.forEach((tooth: any) => {
        tooth.step += tooth.speed
        tooth.position.y += Math.sin(tooth.step) * 0.005
        tooth.position.x += Math.cos(tooth.step) * 0.003
        tooth.material.rotation += tooth.rotationSpeed
        
        // Depth-based blur simulation via scale & opacity
        // Foreground things move more with mouse
        const parallaxFactor = (tooth.position.z + 15) / 15
        tooth.position.x += (mouseX * parallaxFactor - (tooth.position.x - tooth.initialX || 0)) * 0.05
      })

      // Parallax effect on particles
      particlesMesh.rotation.y = mouseX * 0.1
      particlesMesh.rotation.x = -mouseY * 0.1

      renderer.render(scene, camera)
    }
    animate()

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      // Cleanup Three.js resources
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, #0B131E 0%, #0b0c10 100%)'
      }} 
    />
  )
}
