'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

function getUnsplashImage() {
    return 'https://plus.unsplash.com/premium_photo-1731951688289-1de7eb23bdd1?q=80&w=2913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

export default function DashboardPage() {
  const [movies] = useState([
    {
      title: "The Matrix",
      runtime: 136,
      ratings: { average: 8.7 }
    },
    {
      title: "Inception",
      runtime: 148,
      ratings: { average: 8.8 }
    },
    {
      title: "Interstellar",
      runtime: 169,
      ratings: { average: 8.6 }
    }
  ])

  const [movieImages, setMovieImages] = useState<Record<string, string>>({})
  const [recommendations] = useState({
    recommendedMovies: [
      {
        movie: { title: "The Dark Knight" },
        score: 4.8
      },
      {
        movie: { title: "Pulp Fiction" },
        score: 4.6
      },
      {
        movie: { title: "Fight Club" },
        score: 4.5
      }
    ]
  })
  const [recommendationImages, setRecommendationImages] = useState<Record<string, string>>({})
  const [activities] = useState([
    { id: 1, action: "Watched The Matrix", timestamp: "2024-01-20T10:00:00Z" },
    { id: 2, action: "Added Inception to watchlist", timestamp: "2024-01-19T15:30:00Z" },
    { id: 3, action: "Rated Interstellar", timestamp: "2024-01-18T20:15:00Z" },
    { id: 4, action: "Shared The Dark Knight", timestamp: "2024-01-17T12:45:00Z" },
    { id: 5, action: "Commented on Pulp Fiction", timestamp: "2024-01-16T09:20:00Z" }
  ])
  const [notifications] = useState([
    {
      id: 1,
      title: "New Release Available",
      message: "The latest blockbuster is now streaming!",
      createdAt: "2024-01-20T08:00:00Z"
    },
    {
      id: 2,
      title: "Friend Activity",
      message: "John started watching The Matrix",
      createdAt: "2024-01-19T14:30:00Z"
    },
    {
      id: 3,
      title: "Watchlist Update",
      message: "A movie in your watchlist is now available",
      createdAt: "2024-01-18T11:15:00Z"
    }
  ])
  const [user] = useState({
    name: "John Doe",
    username: "johndoe"
  })
  const [userImage, setUserImage] = useState('')

  useEffect(() => {
    const loadImages = async () => {
      // Load user image
      const userImageUrl = getUnsplashImage()
      setUserImage(userImageUrl)

      // Load movie images
      const movieImagesMap: Record<string, string> = {}
      for (const movie of movies) {
        const imageUrl = getUnsplashImage()
        movieImagesMap[movie.title] = imageUrl
      }
      setMovieImages(movieImagesMap)

      // Load recommendation images  
      const recImagesMap: Record<string, string> = {}
      for (const rec of recommendations.recommendedMovies) {
        const imageUrl = getUnsplashImage()
        recImagesMap[rec.movie.title] = imageUrl
      }
      setRecommendationImages(recImagesMap)
    }

    void loadImages()
  }, [movies, recommendations.recommendedMovies, user.name, user.username])

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user.name ?? user.username}!
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Here&apos;s what&apos;s happening in your movie world
        </p>
      </div>

      {/* Continue Watching Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">Continue Watching</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.slice(0, 3).map((movie) => (
            <div
              key={movie.title}
              className="relative overflow-hidden rounded-lg bg-gray-800"
            >
              {movieImages[movie.title] && (
                <Image
                  src={getUnsplashImage()}
                  alt={movie.title}
                  width={300}
                  height={169}
                  className="w-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                <h3 className="text-white font-medium">{movie.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-400">
                  <span>{movie.runtime} min</span>
                  <span className="mx-2">•</span>
                  <span>{movie.ratings.average.toFixed(1)} ★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.recommendedMovies.slice(0, 3).map(({ movie, score }) => (
            <div
              key={movie.title}
              className="relative overflow-hidden rounded-lg bg-gray-800"
            >
              {recommendationImages[movie.title] && (
                <Image
                  src={getUnsplashImage()}
                  alt={movie.title}
                  width={300}
                  height={169}
                  className="w-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                <h3 className="text-white font-medium">{movie.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-400">
                  <span>{score.toFixed(1)} match score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-lg bg-gray-800 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-white">{activity.action}</span>
                </div>
                <time className="text-sm text-gray-400">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </time>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications Section */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-lg bg-gray-800 p-4"
            >
              <h3 className="font-medium text-white">{notification.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{notification.message}</p>
              <div className="mt-2 text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
