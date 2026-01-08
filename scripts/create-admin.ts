import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@maka-laskas.com'
  const password = process.env.ADMIN_PASSWORD || 'AuthorizedAdmin@makalaskas'
  const name = process.env.ADMIN_NAME || 'Admin User'

  console.log('🔐 Creating admin user...')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
  console.log(`Name: ${name}`)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })

  if (existingAdmin) {
    if (existingAdmin.role === 'ADMIN') {
      console.log('✅ Admin user already exists!')
      console.log('Updating password...')
      
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          name,
          isActive: true,
        }
      })
      
      console.log('✅ Admin password updated successfully!')
    } else {
      console.log('⚠️  User exists but is not an admin. Upgrading to admin...')
      
      await prisma.user.update({
        where: { email },
        data: {
          role: 'ADMIN',
          password: hashedPassword,
          name,
          isActive: true,
        }
      })
      
      console.log('✅ User upgraded to admin successfully!')
    }
  } else {
    // Create new admin user
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      }
    })
    
    console.log('✅ Admin user created successfully!')
  }

  console.log('\n📧 Login Credentials:')
  console.log(`   Email: ${email}`)
  console.log(`   Password: ${password}`)
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

