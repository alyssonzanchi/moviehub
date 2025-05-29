import { hash } from 'bcrypt';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return NextResponse.json(
      { message: 'Usuário criado', user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao registrar usuário' },
      { status: 500 }
    );
  }
}
