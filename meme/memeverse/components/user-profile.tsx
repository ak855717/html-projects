"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, selectUserProfile } from "@/lib/features/user-slice"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export function UserProfile() {
  const dispatch = useDispatch()
  const profile = useSelector(selectUserProfile)
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    dispatch(updateProfile({ name, bio }))
    setIsEditing(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <h2 className="text-lg font-semibold">{profile.name}</h2>
              )}
            </div>
          </div>

          <div>
            {isEditing ? (
              <Textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            ) : (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}
          </div>

          <div className="flex justify-end">
            {isEditing ? (
              <>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<React.ElementRef<typeof HTMLDivElement>, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  ),
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof HTMLImageElement>,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof HTMLSpanElement>,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

