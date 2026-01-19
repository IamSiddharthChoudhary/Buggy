"use client";
import { Shield, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent logo text-xl font-bold">
                Buggy
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Enterprise-grade security platform for identifying and managing
              vulnerabilities.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/"
                className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/"
                className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-green-500 transition">
                  Cloud Security
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-500 transition">
                  VAPT Services
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-500 transition">
                  Reteam Assessment
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-500 transition">
                  Compliance Reports
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-green-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-green-500 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="hover:text-green-500 transition"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-green-500" />
                <span>csiddharth380@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-green-500" />
                <span>
                  Over the
                  <br />
                  Clouds
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
