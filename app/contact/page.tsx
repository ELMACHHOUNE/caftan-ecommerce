"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">Get in Touch</h1>
            <p className="text-xl leading-relaxed opacity-90">
              {"We'd love to hear from you. Let us know how we can help."}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-border">
                  <CardHeader>
                    <CardTitle className="text-3xl text-primary">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            placeholder="Fatima Hassan"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="fatima@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Inquiry about rental"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="border-2 border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">info@caftanelegance.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm text-muted-foreground">+212 5XX-XXXXXX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-sm text-muted-foreground">123 Medina Street, Casablanca, Morocco</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl">Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm opacity-90">Stay connected for the latest collections and exclusive offers</p>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-12 h-12 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
