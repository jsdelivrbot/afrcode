package net.fs.algo.test;

import java.util.Arrays;

import junit.framework.TestCase;
import net.fs.algo.PrimalSimplex;

/**
 * 
 */
public class PrimalSimplexTest extends TestCase {
	
	private final static double DELTA = 1e-5;
	
	private PrimalSimplex ps;
	private boolean minimize; 
	private double[] targetCoefficients;
	private Constraint[] constraints;
	private double[] targetCoefficientValuesExpected;
	private double expected;
	private int status;
	
	private void initPrimalSimplex() {
		
		this.expected = 0;
		for(int i=0; i<targetCoefficients.length; ++i) {
			expected += targetCoefficients[i] * targetCoefficientValuesExpected[i];
		}
		
		ps = new PrimalSimplex();
		
		ps.setObjective(targetCoefficients, minimize);
		
		double[][] constraintArray = new double[constraints.length][targetCoefficients.length];
		int[] equations = new int[constraints.length];
		double[] rhs = new double[constraints.length];
		
		for(int i=0; i<constraints.length; ++i) {
			
			constraintArray[i] = constraints[i].getCoefficients();
			equations[i] = constraints[i].getEquations();
			rhs[i] = constraints[i].getRHS();
		}
		
		ps.setConstraints(constraintArray, equations, rhs);
		
		ps.init();
	}
	
	private void assertResult() {
		
		assertEquals(
				true,
				status == PrimalSimplex.OPTIMAL);
		
		assertEquals(
				expected,
				ps.getObjectiveResult(),
				DELTA);
		
		double[] targetCoefficientValues = ps.getCoefficients();
		
		for(int i=0; i<targetCoefficients.length; ++i) {
			assertEquals(
					targetCoefficientValuesExpected[i],
					targetCoefficientValues[i],
					DELTA);
		}
	}
	
	public void solve() {
		
		while((status = ps.iterate()) == PrimalSimplex.CONTINUE) {
			//System.out.println(tps.toString());
		}
	}
	
	public void testTPS1() {
		
		this.minimize = false;
		this.targetCoefficients = new double[] {3, 2};
		this.constraints = new Constraint[] {
				new Constraint(new double[] {2, 1}, PrimalSimplex.LESS_THAN, 100),
				new Constraint(new double[] {1, 1}, PrimalSimplex.LESS_THAN, 80),
				new Constraint(new double[] {1, 0}, PrimalSimplex.LESS_THAN, 40)
		};
		this.targetCoefficientValuesExpected = new double[] {20, 60};
		
		initPrimalSimplex();
		
		solve();
		
		assertResult();
	}
	
	/**
	 * Alysson.
	 * max 0.75 qx + 2.1 qy + 3 qz
	 * subject to
	 * qx + qy + qz <= 60
	 * 2 <= qx <= 10
	 * 10 <= qy <= 50
	 * 1 <= qz <= 5
	 */
	public void testTPS4() {
		this.minimize = false;
		this.targetCoefficients = new double[] {0.75, 2.1, 3};
		this.constraints = new Constraint[] {
				new Constraint(new double[] {1, 1, 1}, PrimalSimplex.LESS_THAN, 60),
				new Constraint(new double[] {1, 0, 0}, PrimalSimplex.LESS_THAN, 10),
				new Constraint(new double[] {1, 0, 0}, PrimalSimplex.GREATER_THAN, 2),
				new Constraint(new double[] {0, 1, 0}, PrimalSimplex.LESS_THAN, 50),
				new Constraint(new double[] {0, 1, 0}, PrimalSimplex.GREATER_THAN, 10),
				new Constraint(new double[] {0, 0, 1}, PrimalSimplex.LESS_THAN, 5),
				new Constraint(new double[] {0, 0, 1}, PrimalSimplex.GREATER_THAN, 1)
		  };
		this.targetCoefficientValuesExpected = new double[] {5, 50, 5};
		
		initPrimalSimplex();
		
		solve();
		
		assertResult();
		
		System.out.println(ps.toString());
		System.out.println(ps.getObjectiveResult());
		System.out.println(Arrays.toString(ps.getCoefficients()));
	}
	
	public void testTPS2() {
		
		this.minimize = false;
		this.targetCoefficients = new double[] {2, 5};
		this.constraints = new Constraint[] {
				new Constraint(new double[] {1, 0}, PrimalSimplex.LESS_THAN, 5),
				new Constraint(new double[] {0, 1}, PrimalSimplex.LESS_THAN, 4),
				new Constraint(new double[] {2, 3}, PrimalSimplex.LESS_THAN, 16)
		};
		this.targetCoefficientValuesExpected = new double[] {2, 4};
		
		initPrimalSimplex();
		
		solve();
		
		assertResult();
	}
	
	public void testTPS3() {
		
		this.minimize = false;
		this.targetCoefficients = new double[] {4, 8, 8, 4, 1, 1};
		this.constraints = new Constraint[] {
				new Constraint(new double[] {1, 1, 0, 0, 0, 0}, PrimalSimplex.EQUAL_TO,     200),
				new Constraint(new double[] {0, 0, 1, 1, 0, 0}, PrimalSimplex.EQUAL_TO,     200),
				new Constraint(new double[] {1, 0, 1, 0, 0, 0}, PrimalSimplex.LESS_THAN,    300),
				new Constraint(new double[] {0, 1, 0, 1, 0, 0}, PrimalSimplex.LESS_THAN,    300),
				new Constraint(new double[] {1, 0, 1, 0, 0, 0}, PrimalSimplex.GREATER_THAN, 1),
				new Constraint(new double[] {0, 1, 0, 1, 0, 0}, PrimalSimplex.GREATER_THAN, 1),
				new Constraint(new double[] {0, 0, 0, 0, 1, 0}, PrimalSimplex.EQUAL_TO,     1000),
				new Constraint(new double[] {0, 0, 0, 0, 0, 1}, PrimalSimplex.EQUAL_TO,     1000)
		};
		this.targetCoefficientValuesExpected = new double[] {0, 200, 200, 0, 1000, 1000};
		
		initPrimalSimplex();
		
		solve();
		
		assertResult();
	}

	private class Constraint {
		private double[] coefficients;
		private int equations;
		private double rhs;
		
		public Constraint(double[] coefficients, int equations, double rhs) {
			this.coefficients = coefficients;
			this.equations = equations;
			this.rhs = rhs;
		}

		public double[] getCoefficients() {
			return coefficients;
		}

		public int getEquations() {
			return equations;
		}

		public double getRHS() {
			return rhs;
		}
	}
}
