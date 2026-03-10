
import { Slide } from "../types";

// Mock implementation to avoid requiring an API key
export async function generateMapImage(region: string): Promise<string> {
  console.log(`Mock: Generating map image for ${region}`);
  // Return a high-quality placeholder image that looks like a map/isometric design
  return `https://picsum.photos/800/800?random=${Math.floor(Math.random() * 1000)}`;
}

export async function generateCarouselContent(topic: string): Promise<Partial<Slide>[]> {
  console.log(`Mock: Generating carousel content for ${topic}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock content in Arabic as the project seems to be in Arabic
  return [
    {
      title: `مقدمة حول ${topic}`,
      description: `اكتشف أهم المفاهيم والأساسيات المتعلقة بـ ${topic} وكيفية الاستفادة منها.`
    },
    {
      title: "الأهمية والأهداف",
      description: "لماذا نركز على هذا المجال؟ وما هي النتائج المتوقعة عند التطبيق الصحيح؟"
    },
    {
      title: "الخطوات العملية",
      description: "دليل خطوة بخطوة للبدء في تنفيذ الاستراتيجيات وتحقيق النجاح المستهدف."
    },
    {
      title: "أمثلة واقعية",
      description: "استعراض لبعض الحالات الناجحة التي حققت نتائج مبهرة في هذا المجال."
    },
    {
      title: "الخلاصة والنصيحة",
      description: "نصائح ذهبية لضمان استمرارية النمو والتطور في تطبيق هذه المفاهيم."
    }
  ];
}

