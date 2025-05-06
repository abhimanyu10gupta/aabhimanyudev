"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export function ConstellationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let points: Point[] = []
    const numPoints = 100
    const maxConnections = 5
    const connectionDistance = 150
    const pointSize = 1.5
    const mousePosition = { x: 0, y: 0 }
    let mouseActive = false

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPoints()
    }

    const initPoints = () => {
      points = []
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }
    }

    const updateConnections = () => {
      // Reset connections
      points.forEach((point) => {
        point.connections = []
      })

      // Find new connections
      for (let i = 0; i < points.length; i++) {
        const distances: { index: number; distance: number }[] = []

        for (let j = 0; j < points.length; j++) {
          if (i === j) continue

          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            distances.push({ index: j, distance })
          }
        }

        // Sort by distance and take the closest ones
        distances.sort((a, b) => a.distance - b.distance)
        points[i].connections = distances.slice(0, maxConnections).map((d) => d.index)
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update points
      points.forEach((point, index) => {
        // Move points
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Mouse interaction
        if (mouseActive) {
          const dx = mousePosition.x - point.x
          const dy = mousePosition.y - point.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            point.vx += (dx / distance) * force * 0.02
            point.vy += (dy / distance) * force * 0.02
          }
        }

        // Limit velocity
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy)
        const maxSpeed = 1.5
        if (speed > maxSpeed) {
          point.vx = (point.vx / speed) * maxSpeed
          point.vy = (point.vy / speed) * maxSpeed
        }

        // Draw connections
        point.connections.forEach((connectionIndex) => {
          const connectedPoint = points[connectionIndex]
          const dx = point.x - connectedPoint.x
          const dy = point.y - connectedPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const opacity = 1 - distance / connectionDistance

          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(connectedPoint.x, connectedPoint.y)
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        })

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(124, 58, 237, 0.8)"
        ctx.fill()
      })

      // Update connections periodically
      if (Math.random() < 0.01) {
        updateConnections()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY
      mouseActive = true
    }

    const handleMouseLeave = () => {
      mouseActive = false
    }

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    resizeCanvas()
    updateConnections()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
