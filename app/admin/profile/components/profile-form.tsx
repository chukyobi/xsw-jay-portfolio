"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import type { Profile } from "@/lib/types"
import { profileFormSchema, type ProfileFormData } from "@/lib/validations/profile"

interface ProfileFormProps {
  profile: Profile
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      headline: profile.headline,
      description: profile.description,
      image_url: profile.image_url,
      location: profile.location,
      stats: profile.stats,
    },
  })

  const { fields: descFields, append: appendDesc, remove: removeDesc } = useFieldArray({
    control,
    name: "description" as any,
  })

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
    control,
    name: "stats" as any,
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      await updateProfile(profile.id, data)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
      router.push("/admin/dashboard?tab=profile")
      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your personal information shown in the About Me section</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" {...register("headline")} />
            {errors.headline && <p className="text-sm text-red-500">{errors.headline.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Profile Image URL</Label>
            <Input id="image_url" {...register("image_url")} />
            {errors.image_url && <p className="text-sm text-red-500">{errors.image_url.message}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Description Paragraphs</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => appendDesc("")}>
                <Plus className="h-4 w-4 mr-1" /> Add Paragraph
              </Button>
            </div>
            {descFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Textarea 
                  {...register(`description.${index}` as any)} 
                  rows={3}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500"
                  onClick={() => removeDesc(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Stats</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => appendStat({ value: "", label: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add Stat
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start border p-3 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input placeholder="Value (e.g. 5+)" {...register(`stats.${index}.value` as any)} />
                    <Input placeholder="Label (e.g. Projects)" {...register(`stats.${index}.label` as any)} />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500"
                    onClick={() => removeStat(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {errors.stats && <p className="text-sm text-red-500">{errors.stats.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6 text-white ">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
