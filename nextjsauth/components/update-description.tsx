'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { updateDescription } from '@/server/update';

export function DescriptionUpdate() {
  const [description, setDescription] = React.useState("");

  const handleSubmit = async () => {
    await updateDescription(description);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add description</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle>Edit description</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="name" value={description} className="col-span-3" onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleSubmit()} >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}