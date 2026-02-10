# Deployment Guide - Vercel + Porkbun

## Prerequisites
- Vercel account
- Porkbun domain (physalign.app)
- Supabase project configured

## Vercel Deployment Setup

### 1. Dashboard App Deployment
```bash
# Navigate to dashboard directory
cd phsyalign-dashboard

# Deploy to Vercel
vercel --prod

# Or link existing project
vercel link
vercel --prod
```

### 2. Patient App Deployment
```bash
# Navigate to patient app directory
cd patient-app

# Deploy to Vercel
vercel --prod

# Or link existing project
vercel link
vercel --prod
```

## Domain Configuration (Porkbun)

### 1. Add Domain to Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add domain: `physalign.app`

### 2. DNS Configuration in Porkbun
Add these DNS records:

**A Records:**
```
Type: A
Name: @
Content: 76.76.21.21
TTL: 300
```

**CNAME Records:**
```
Type: CNAME
Name: www
Content: cname.vercel-dns.com
TTL: 300
```

**For Subdomains (if needed):**
```
Type: CNAME
Name: dashboard
Content: cname.vercel-dns.com
TTL: 300

Type: CNAME
Name: patient
Content: cname.vercel-dns.com
TTL: 300
```

## Environment Variables

### Dashboard App (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Patient App (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Set these in Vercel:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add variables for Production environment

## Supabase Configuration

### Database Setup
1. Run migration script: `api/supabase_migration.sql`
2. Configure authentication providers
3. Set up storage buckets for video uploads

### CORS Configuration
In Supabase Dashboard → Project Settings → API:
- Add your domain(s) to CORS origins
- Example: `https://physalign.app`, `https://dashboard.physalign.app`

## Monitoring and Maintenance

### Health Checks
- Monitor Vercel deployments
- Check Supabase database performance
- Monitor API endpoint response times

### Backup Strategy
- Regular database backups via Supabase
- Git repository backups
- Environment variable documentation

## Troubleshooting

### Common Issues
1. **Domain not resolving**: Check DNS propagation (can take 24-48 hours)
2. **Environment variables not loading**: Verify they're set in Vercel for correct environment
3. **CORS errors**: Ensure domains are whitelisted in Supabase
4. **Build failures**: Check build logs in Vercel dashboard

### Rollback Procedure
1. In Vercel Dashboard, go to project → Deployments
2. Find previous working deployment
3. Click "Rollback" or redeploy that version