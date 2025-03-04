"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gift, CreditCard, Shield } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-16 my-8 rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-900/20 z-0" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Start Your Casino Adventure Today
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of players and experience the thrill of our immersive casino games. Sign up now and claim
            your welcome bonus!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Sign Up & Get Bonus
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Generous Bonuses</h3>
              <p className="text-muted-foreground text-center">
                Enjoy welcome bonuses, free spins, and regular promotions
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-center">
                Multiple payment options with fast deposits and withdrawals
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Safe & Fair Gaming</h3>
              <p className="text-muted-foreground text-center">
                Licensed casino with certified fair games and secure encryption
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

